export default function resetCSSBody() {
  const { body } = document;
  body.removeAttribute('data-initial-overflow');
  body.removeAttribute('data-initial-padding');
  body.style.paddingRight = '';
  body.style.overflow = '';
}
