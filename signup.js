function openModal() {
    document.getElementById("signupModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("signupModal").style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("signupModal");
    if (event.target === modal) {
        closeModal();
    }
};
