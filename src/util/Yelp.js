// Yelp App Name: ravenous
const apiKey = 'PG3io6yskF0JQO4-YdfXv8AR5Q6VM5kme5fe7dlI2RoUzj8wNMKHZHwnERPUGN_5caQLec-iSHNAEW7gsn8rcjTNg2pp7qsJf8V1shVkL5pEv_EfC4sh8mwOuNvaWnYx'
// const clientId = 'gPBue6gX-HMczfcPyqvOtg'

const Yelp = {
  search(term, location, sortBy) {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const yelpUrl = `${corsAnywhereUrl}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    const browserHeader = { headers: { Authorization: `Bearer ${apiKey}` } };
    return fetch(yelpUrl, browserHeader).then( response => {
      return response.json();
    }).then( jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map( business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          };
        });
      }
    });
  }
};

export default Yelp;
