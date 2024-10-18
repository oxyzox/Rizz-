document.addEventListener('DOMContentLoaded', () => {
    const pickupLineElement = document.getElementById('pickupLine');
    const newLineBtn = document.getElementById('newLineBtn');
    const copyBtn = document.getElementById('copyBtn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    let currentCategory = 'all';


    const API_BASE_URL = 'https://rizzapi.vercel.app';


    async function fetchPickupLine(category = 'all') {
        let url = `${API_BASE_URL}/random`;
        if (category !== 'all') {
            url = `${API_BASE_URL}/category/${category}?page=1&perPage=1`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            const line = Array.isArray(data) ? data[0].text : data.text;
            pickupLineElement.innerText = line;
        } catch (error) {
            pickupLineElement.innerText = 'Failed to fetch a pick-up line. Please try again!';
            console.error('Error fetching pickup line:', error);
        }
    }


    fetchPickupLine();

 
    newLineBtn.addEventListener('click', () => fetchPickupLine(currentCategory));

 
    copyBtn.addEventListener('click', () => {
        const textToCopy = pickupLineElement.innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Pick-up line copied to clipboard!'))
            .catch(() => alert('Failed to copy pick-up line.'));
    });

   
    categoryBtns.forEach(button => {
        button.addEventListener('click', () => {
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            fetchPickupLine(currentCategory);
        });
    });
});