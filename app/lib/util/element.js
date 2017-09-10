/*global */
/**
 *
 * @flow
 */

"use strict";

function findTabbableChildren(root: HTMLElement): Array<HTMLElement> {
  const children = root.querySelectorAll('*');
  const filtered =  Array.prototype.filter.call(children, element => {
    const tagname = element.nodeName.toLowerCase();
    if (
      tagname === 'a' && element.href
      || element.tabIndex && !isNaN(element.tabIndex) && element.tabIndex !== -1
      || tagname === 'input'
      || tagname === 'textarea'
      || tagname === 'select'
      || tagname === 'button'
    ) {
      return isVisible(element) ? true : false;
    }
    return false;
  });
  return filtered;
}

function isVisible(element: HTMLElement) {
  return (
    element.offsetHeight > 0
    && element.offsetWidth > 0
    && element.style.display !== 'none'
    && element.style.visibility !== 'hidden'
  );
}

module.exports = {
  findTabbableChildren,
  isVisible,
};
