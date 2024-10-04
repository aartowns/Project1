async function grabBackgrounds() {
    try {
        let page = 1;
        let moreData = true;
        /**
         * @type {string | any[]}
         */
        let backgrounds = [];
        let selectedBackground = null;

        while (moreData) {
            const response = await fetch(`https://api.open5e.com/v2/backgrounds/?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();

            if (data.results.length > 0) {
                backgrounds = [...backgrounds, ...data.results];
                page++;
            } else {
                moreData = false;
            }
        }
        if (backgrounds.length > 0) {
            selectedBackground = backgrounds[0];
        }
    } catch (error) {
        console.error('Error fetching backgrounds:', error);
    }
};