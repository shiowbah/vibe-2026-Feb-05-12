
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    const output = document.getElementById('itinerary-output');
    const hotelOutput = document.getElementById('hotel-suggestion');
    const loading = document.getElementById('loading');

    // Expanded pre-defined itineraries and hotel suggestions
    const destinations = {
        'paris': {
            itinerary: [
                { morning: 'Visit the Louvre Museum', afternoon: 'Climb the Eiffel Tower', evening: 'Seine River Cruise' },
                { morning: 'Explore Montmartre & Sacré-Cœur', afternoon: 'Walk along Champs-Élysées to the Arc de Triomphe', evening: 'Enjoy a show at Moulin Rouge' },
                { morning: 'Day trip to the Palace of Versailles', afternoon: 'Explore the Gardens of Versailles', evening: 'Dinner in the Le Marais district' },
                { morning: 'Visit Musée d\'Orsay', afternoon: 'Stroll through Luxembourg Gardens', evening: 'Explore the Latin Quarter' },
                { morning: 'Discover Sainte-Chapelle & Conciergerie', afternoon: 'Shop at Galeries Lafayette', evening: 'Attend an opera at Palais Garnier' },
            ],
            hotels: [
                { name: 'Le Bristol Paris', type: 'Luxury', description: 'An icon of French elegance and art de vivre, located on the prestigious Rue du Faubourg Saint-Honoré.' },
                { name: 'Hôtel de Crillon', type: 'Luxury', description: 'A historic palace hotel on Place de la Concorde, offering a refined and timeless Parisian experience.' },
                { name: 'Hotel Malte - Astotel', type: 'Mid-Range', description: 'A charming and stylish hotel in the heart of the 2nd arrondissement, known for its excellent service.' },
                { name: 'Generator Paris', type: 'Budget', description: 'A trendy and modern hostel with a rooftop terrace offering stunning views of Montmartre.' },
            ]
        },
        'tokyo': {
            itinerary: [
                { morning: 'Visit Senso-ji Temple in Asakusa', afternoon: 'Explore Akihabara Electric Town', evening: 'Cross the Shibuya Scramble Crossing' },
                { morning: 'Visit the Meiji Shrine & Yoyogi Park', afternoon: 'Explore Harajuku and Takeshita Street', evening: 'Dinner and drinks in Shinjuku Golden Gai' },
                { morning: 'Explore the Tsukiji Outer Market', afternoon: 'Imperial Palace East Garden', evening: 'Experience teamLab Borderless digital art museum' },
                { morning: 'Day trip to Hakone for views of Mt. Fuji', afternoon: 'Ride the Hakone Ropeway', evening: 'Relax in an onsen (hot spring)' },
                { morning: 'Visit the Ghibli Museum (requires advance tickets)', afternoon: 'Stroll through Inokashira Park', evening: 'Dinner in Kichijoji' },
            ],
            hotels: [
                { name: 'Park Hyatt Tokyo', type: 'Luxury', description: 'Famous for its role in \"Lost in Translation,\" offering breathtaking views and impeccable service.' },
                { name: 'Aman Tokyo', type: 'Luxury', description: 'A serene and luxurious sanctuary with a stunning design, located near the Imperial Palace.' },
                { name: 'Shibuya Granbell Hotel', type: 'Mid-Range', description: 'A stylish and modern hotel in the heart of Shibuya, perfect for exploring the vibrant district.' },
                { name: 'Book And Bed Tokyo', type: 'Budget', description: 'A unique hostel where you can sleep in a bookshelf, offering a cozy and memorable experience.' },
            ]
        }
    };

    // Generic activity pools
    const genericActivities = {
        morning: [
            'Visit a famous landmark or monument',
            'Explore the historic old town center',
            'Take a guided walking tour',
            'Browse a bustling local market',
            'Hike a scenic trail in a nearby park',
        ],
        afternoon: [
            'Have lunch at a traditional restaurant',
            'Go shopping in a well-known district',
            'Visit a contemporary art gallery',
            'Take a river or harbor boat tour',
        ],
        evening: [
            'Enjoy fine dining at a renowned restaurant',
            'Watch a show at a historic theater',
            'Experience the nightlife in the city center',
            'Go for a sunset walk along a scenic viewpoint',
        ]
    };

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        const newArray = [...array];
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        output.innerHTML = '';
        hotelOutput.innerHTML = '';
        loading.style.display = 'block';

        setTimeout(() => {
            const destinationInput = document.getElementById('destination').value;
            const destinationKey = destinationInput.toLowerCase();
            const startDate = new Date(document.getElementById('start-date').value);
            const endDate = new Date(document.getElementById('end-date').value);

            if (endDate < startDate) {
                alert('End date cannot be before start date.');
                loading.style.display = 'none';
                return;
            }

            const diffTime = Math.abs(endDate - startDate);
            const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

            let plan = [];
            const destinationData = destinations[destinationKey];

            if (destinationData) {
                const specificItinerary = destinationData.itinerary;
                for (let i = 0; i < duration; i++) {
                    plan.push(specificItinerary[i % specificItinerary.length]);
                }
                const hotel = destinationData.hotels[Math.floor(Math.random() * destinationData.hotels.length)];
                hotelOutput.innerHTML = `<h2>Hotel Suggestion</h2><div class="hotel-card"><h3>${hotel.name} (${hotel.type})</h3><p>${hotel.description}</p></div>`;
            } else {
                const shuffledMornings = shuffle(genericActivities.morning);
                const shuffledAfternoons = shuffle(genericActivities.afternoon);
                const shuffledEvenings = shuffle(genericActivities.evening);

                for (let i = 0; i < duration; i++) {
                    plan.push({
                        morning: `${shuffledMornings[i % shuffledMornings.length]} in ${destinationInput}`,
                        afternoon: shuffledAfternoons[i % shuffledAfternoons.length],
                        evening: shuffledEvenings[i % shuffledEvenings.length],
                    });
                }
                hotelOutput.innerHTML = `<h2>Hotel Suggestion</h2><div class="hotel-card"><p>For ${destinationInput}, we recommend searching on popular booking websites to find a hotel that fits your budget and preferences.</p></div>`;
            }
            
            output.innerHTML = plan.map((dayPlan, i) => {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                return `
                <div class="itinerary-day-card">
                    <h3>${dateString}</h3>
                    <ul>
                        <li><b>Morning:</b> ${dayPlan.morning}</li>
                        <li><b>Afternoon:</b> ${dayPlan.afternoon}</li>
                        <li><b>Evening:</b> ${dayPlan.evening}</li>
                    </ul>
                </div>
            `}).join('');

            loading.style.display = 'none';
        }, 1000);
    });
});
