let selectedCategory = '';
const description = {
    hobby: "Explore fun hobbies like dancing, painting, and more!",
    sport: "Test your knowledge about popular sports from around the world!",
    history: "Dive into the rich world of historical events and figures.",
    country: "Discover the countries and cultures across the globe."
};

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('continue-button').style.display = 'block';
    document.getElementById('category-description').innerHTML = `<p>${description[category]}</p>`;
    
    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => {
        box.classList.remove('selected');
    });
    document.getElementById(category).classList.add('selected');
}

function continueToLevel() {
    if (selectedCategory) {
        window.location.href = `level.html?category=${selectedCategory}`; 
    }
}

function goBack() {
    window.location.href = 'index.html';  
}
