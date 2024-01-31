//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  const selectAllLink = document.getElementById('select-all');
  const checkboxes = document.querySelectorAll('.govuk-checkboxes__input');
  const radios = document.querySelectorAll('.govuk-radios__input');
  const submitTasksButton = document.getElementById('submit-selected-no-biz-tasks-btn');
  const checkboxErrorSpan = document.getElementById('selectedItems-error');
  const selectUserButton = document.getElementById('select-user-type-btn');
  const radioErrorSpan = document.getElementById('chooseUserType-error');

  if (selectAllLink) {
    selectAllLink.addEventListener('click', function (event) {
      event.preventDefault();

      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    });
  }

  if (submitTasksButton) {
    submitTasksButton.addEventListener('click', function (event) {
      const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
  
      if (checkedCheckboxes.length === 0) {
        event.preventDefault();
        checkboxErrorSpan.style.display = 'block';
      }
    });
  }

  if (selectUserButton) {
    selectUserButton.addEventListener('click', function (event) {
      const checkedRadio = Array.from(radios).filter(radio => radio.checked);
  
      if (checkedRadio.length === 0) {
        event.preventDefault();
        radioErrorSpan.style.display = 'block';
      }
    });
  }
});
