import React from 'react';
import ReactDOM from 'react-dom';
import AIModal from './AIModal'; // Assuming AIModal is your modal component

// Define content script configuration (WXT specific)
export default defineContentScript({
  matches: ["https://www.linkedin.com/*"], // Match LinkedIn
  runAt: "document_idle", // Inject when the document is fully loaded
  main(ctx) {

    let targetMessageField: HTMLElement | null = null; // Hold reference to the LinkedIn message field

    // Function to dynamically create and show the AI icon
    async function showAIIcon(targetElement: HTMLElement) {
      // const svgResponse = await fetch(browser.runtime.getURL('icon/Vector.svg' as any));
      // const svgText = await svgResponse.text();
      if (document.getElementById('ai-icon')) return; // Avoid duplicates
    
      // Query the LinkedIn message input field using the class `msg-form__contenteditable`
      const messageInputDiv = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    
      if (messageInputDiv) {
        // Create the AI icon inside the `msg-form__contenteditable` div
        const icon = document.createElement('span'); // Use span for inline display
        icon.id = 'ai-icon';
        icon.style.cursor = 'pointer'; // Make the icon clickable
        icon.style.position = 'absolute'; // Positioning within the container
        icon.style.bottom = `10px`; // Adjust bottom positioning
        icon.style.right = `10px`; // Adjust right positioning
        icon.style.zIndex = '100'; // Ensure it's on top of other elements
    
        // Insert the SVG icon into the span
        icon.innerHTML = `<div class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg">
    <img src="${browser.runtime.getURL('icon/Vector.svg' as any)}" alt="AI Icon" class="w-6 h-6 text-blue-500" />
  </div>`
        // icon.innerHTML = svgText
        // icon.innerHTML = `<img src="${svgText}" alt="AI   Icon" class="w-6 h-6 text-blue-500" />;`

        // Add the icon to the message input div
        messageInputDiv.appendChild(icon);
    
        // When the icon is clicked, show the modal
        icon.addEventListener('click', () => {
          showModal();
        });
      }
    }
    

    // Function to remove the AI icon
    function hideAIIcon() {
      const icon = document.getElementById('ai-icon');
      if (icon) {
        icon.remove();
      }
    }

    // Function to render the modal and handle inserting text
    function showModal() {
      const modalContainer = document.createElement('div');
      modalContainer.id = 'ai-modal';
      modalContainer.style.position = 'fixed';
  modalContainer.style.top = '0';
  modalContainer.style.left = '0';
  modalContainer.style.width = '100vw';
  modalContainer.style.height = '100vh';
  modalContainer.style.display = 'flex';
  modalContainer.style.alignItems = 'center';
  modalContainer.style.justifyContent = 'center';
  modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dark transparent background
  modalContainer.style.zIndex = '9999'; // Ensure it's above other content

      document.body.appendChild(modalContainer);

      ReactDOM.render(
        <AIModal
          onClose={() => {
            hideModal();
          }}
          onInsert={(message: string) => {
            insertMessage(message);
            hideModal();
          }}
        />,
        modalContainer
      );
    }

    // Function to unmount the modal component and remove its DOM container
    function hideModal() {
      const modalContainer = document.getElementById('ai-modal');
      if (modalContainer) {
        ReactDOM.unmountComponentAtNode(modalContainer);
        modalContainer.remove();
      }
    }

    // Function to insert the AI-generated message into the LinkedIn message field (contenteditable div)
    function insertMessage(message: string) {
      if (targetMessageField) {
        targetMessageField.innerHTML = `<p>${message}</p>`;
        targetMessageField.dispatchEvent(new Event('input', { bubbles: true })); // Trigger LinkedIn's change detection
      }
    }

    // Listen for focus on the LinkedIn message field
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.getAttribute('data-artdeco-is-focused') === 'true' && target.classList.contains('msg-form__contenteditable')) {
        targetMessageField = target; // Save the focused message field
        showAIIcon(targetMessageField);
      }
    });

    // Listen for focus out to remove the AI icon
    document.addEventListener('focusout', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('msg-form__contenteditable')) {
        hideAIIcon();
      }
    });
  }
});
