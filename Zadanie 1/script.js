function change(element) {
    element.querySelectorAll('*').forEach(function(child) {
        child.classList.toggle('active');
    });
}
