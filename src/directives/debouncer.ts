/* const debouncer = (fn: { (): void; apply?: any }, delay: number | undefined) => {
  let timeoutID: number | null | undefined = null;
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
};

function debounce(
  el: { oninput: () => void; dispatchEvent: (arg0: Event) => void },
  binding: { value: string; oldValue: any },
) {
  if (binding.value !== binding.oldValue) {
    el.oninput = debouncer(() => {
      el.dispatchEvent(new Event('change'));
    }, parseInt(binding.value) || 500);
  }
}

export default debounce;
 */
