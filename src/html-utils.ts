export function getFormValues(
  target: HTMLFormElement,
): Record<string, string | Object> {
  const formData = new FormData(target);
  const detail: Record<string, string | Object> = {};
  for (const [name, value] of formData) {
    detail[name] = value.valueOf();
  }
  return detail;
}

export function emitFormValues(thisArg: EventTarget, eventName: string) {
  return function (e: Event) {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const { target: form } = e;

      const detail = getFormValues(form);

      thisArg.dispatchEvent(
        new CustomEvent(eventName, {
          detail,
        }),
      );

      form.reset();
    }
  };
}
