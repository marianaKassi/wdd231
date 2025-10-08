let modalInstance = null;

export function setupModal() {
    modalInstance = document.getElementById('culturalModal');
    
    if (!modalInstance) {
        console.warn('Modal element not found in DOM');
        return;
    }

    // Close modal when clicking the X
    const closeBtn = modalInstance.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

export function openModal(content) {
    if (!modalInstance) {
        console.error('Modal not initialized. Call setupModal() first.');
        return;
    }

    const modalBody = modalInstance.querySelector('#modalBody');
    if (modalBody) {
        modalBody.innerHTML = content;
    }

    modalInstance.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add accessibility attributes
    modalInstance.setAttribute('aria-hidden', 'false');
    modalInstance.setAttribute('aria-modal', 'true');
    
    console.log('Modal opened with content');
}

export function closeModal() {
    if (!modalInstance) return;

    modalInstance.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Update accessibility attributes
    modalInstance.setAttribute('aria-hidden', 'true');
    modalInstance.setAttribute('aria-modal', 'false');
    
    console.log('Modal closed');
}

export function isModalOpen() {
    return modalInstance && modalInstance.style.display === 'block';
}