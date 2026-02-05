
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    const output = document.getElementById('itinerary-output');
    const loading = document.getElementById('loading');

    const itineraries = {
        'paris': [
            { 'morning': 'Visit the Louvre Museum', 'afternoon': 'Climb the Eiffel Tower', 'evening': 'Seine River Cruise' },
            { 'morning': 'Explore Montmartre & Sacré-Cœur', 'afternoon': 'Walk along Champs-Élysées to the Arc de Triomphe', 'evening': 'Enjoy a show at Moulin Rouge' },
            { 'morning': 'Day trip to the Palace of Versailles', 'afternoon': 'Explore the Gardens of Versailles', 'evening': 'Dinner in the Le Marais district' },
        ],
        'tokyo': [
            { 'morning': 'Visit Senso-ji Temple in Asakusa', 'afternoon': 'Explore Akihabara Electric Town', 'evening': 'Cross the Shibuya Scramble Crossing' },
            { 'morning': 'Visit the Meiji Shrine', 'afternoon': 'Explore Harajuku and Takeshita Street', 'evening': 'Dinner and drinks in Shinjuku Golden Gai' },
            { 'morning': 'Day trip to Hakone for views of Mt. Fuji', 'afternoon': 'Ride the Hakone Ropeway', 'evening': 'Relax in an onsen (hot spring)' },
        ]
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        output.innerHTML = '';
        loading.style.display = 'block';

        setTimeout(() => {
            const destination = document.getElementById('destination').value.toLowerCase();
            const duration = parseInt(document.getElementById('duration').value, 10);

            let plan = itineraries[destination];

            if (!plan) {
                plan = Array.from({ length: duration }, (_, i) => ({
                    'morning': `Explore the main attraction of ${document.getElementById('destination').value}`,
                    'afternoon': 'Visit a local museum or park',
                    'evening': 'Try a highly-rated local restaurant'
                }));
            }

            for (let i = 0; i < duration; i++) {
                const dayPlan = plan[i % plan.length]; // Cycle through the plan if duration is longer
                const dayCard = document.createElement('div');
                dayCard.className = 'itinerary-day-card';
                dayCard.innerHTML = `
                    <h3>Day ${i + 1}</h3>
                    <ul>
                        <li><b>Morning:</b> ${dayPlan.morning}</li>
                        <li><b>Afternoon:</b> ${dayPlan.afternoon}</li>
                        <li><b>Evening:</b> ${dayPlan.evening}</li>
                    </ul>
                `;
                output.appendChild(dayCard);
            }
            loading.style.display = 'none';
        }, 1000); // Simulate a delay for generating the itinerary
    });
});
