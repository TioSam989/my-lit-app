import { Store, ActionCreator, Unsubscribe } from "@reduxjs/toolkit";

type WebComponent = HTMLElement & {
  render?(...args: any[]): any;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
};

type Constructor<T extends WebComponent = WebComponent> = new (
  ...args: any[]
) => T;

interface ConnectedElement<TState, TProps> extends WebComponent {
  onStateChanged?(state: TState): void;
  onPropsChanged?(props: TProps): void;
}

type AnyFunction = (...args: any[]) => any;
type MapStateToProps<S> = (s: S) => any & AnyFunction;

function isUndefined<A>(a: A): boolean {
  return typeof a === "undefined";
}

function isEqual<A>(a: A, b: A): boolean {
  return a === b;
}

function complement(predicate: (...args: any[]) => boolean) {
  return function complemented(...args: any[]): boolean {
    return !predicate(...args);
  };
}

const isDifferent = complement(isEqual);

export enum AutoAssign {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

export function connect<S, TMapStateToProps extends MapStateToProps<S>>(
  store: Store<S>,
  mapStateToProps?: TMapStateToProps,
  mapDispatchToEvents?:
    | { [key: string]: ActionCreator<any> }
    | ((dispatch: typeof store.dispatch) => {
        [key: string]: (...args: any[]) => void;
      }),
  autoAssign: AutoAssign = AutoAssign.Disabled,
) {
  type StateType = ReturnType<typeof store.getState>;
  type MapStateToPropsReturn = ReturnType<TMapStateToProps>;
  return function <
    C extends Constructor<ConnectedElement<StateType, MapStateToPropsReturn>>,
  >(constructor: C) {
    return class
      extends constructor
      implements ConnectedElement<S, MapStateToPropsReturn>
    {
      _unsubscribe!: Unsubscribe;

      previousState!: S;
      previousProps!: MapStateToPropsReturn;

      handleEvents() {
        if (mapDispatchToEvents) {
          if (typeof mapDispatchToEvents === "function") {
            const eventMap = mapDispatchToEvents(store.dispatch);
            Object.keys(eventMap).map((eventName) => {
              this.addEventListener(eventName, (e: Event) => {
                const dispatcher = eventMap[eventName];

                let argument: any | undefined = undefined;

                if (e instanceof CustomEvent) {
                  const { detail } = e;
                  argument = detail;
                }

                dispatcher(argument);
              });
            });
          } else {
            Object.keys(mapDispatchToEvents).forEach((eventName) => {
              this.addEventListener(eventName, (e: Event) => {
                const actionCreator = mapDispatchToEvents[eventName];

                let argument: any | undefined = undefined;

                if (e instanceof CustomEvent) {
                  const { detail } = e;
                  argument = detail;
                }

                store.dispatch(actionCreator(argument));
              });
            });
          }
        }
      }

      handleStoreChange() {
        const currentState = store.getState();

        if (
          isUndefined(this.previousState) ||
          isDifferent(this.previousState, currentState)
        ) {
          this.onStateChanged?.(currentState);
          this.previousState = currentState;
        }

        const currentProps = mapStateToProps?.(currentState);

        if (
          isUndefined(this.previousProps) ||
          isDifferent(this.previousProps, currentProps)
        ) {
          this.onPropsChanged?.(currentProps);
          this.previousProps = currentProps;
          if (
            autoAssign &&
            autoAssign == AutoAssign.Enabled &&
            typeof currentProps === "object"
          ) {
            Object.assign(this, currentProps);
          }
        }
      }

      connectedCallback() {
        super.connectedCallback?.();

        this._unsubscribe = store.subscribe(() => {
          this.handleStoreChange();
        });

        this.handleStoreChange();
        this.handleEvents();
      }

      disconnectedCallback() {
        this._unsubscribe();
        super.disconnectedCallback?.();
      }

      render(...args: any[]) {
        console.log(`${this.localName}.render`);
        return super.render?.(...args);
      }
    };
  };
}
