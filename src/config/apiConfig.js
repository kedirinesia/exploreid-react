// API Configuration untuk ExploreID React App
 

// ===== AUTHENTICATION API =====
export const AUTH_URLS = {
 
  USER_LOGIN: 'https://script.google.com/macros/s/AKfycbznONrALGrru66pC-WD7CX49FsnokjxKEARP106z-TEVwBOI7m8HYg4AacSQOSFcKRKBA/exec',
  /*
  METHOD : POST
  contoh body USER_LOGIN :
 {
 
  "action": "login",
  "email": "developer@messi.com",
  "password": "developer"
}



CONTOH RESPONSE USER_LOGIN :
{{
    "status": "success",
    "message": "Login successful",
    "user": {
        "id": 3,
        "username": "Developer",
        "email": "developer@messi.com"
    }
}
  */


  USER_REGISTER: 'https://script.google.com/macros/s/AKfycbzf0jE0ax7xHqRstfF4W420E9Sazmm7Tki5sW5Dg0SE6Nih8C1z0KMjUJGKFv9NjnJrVA/exec',
  /*
  METHOD : POST
  contoh body USER_REGISTER :
  {
  "action": "register",
  "username": "abcde",
  "email": "abcde@mail.coma",
  "password": "1234"
}

  CONTOH RESPONSE USER_REGISTER :
  {
    "status": "success",
    "message": "User registered successfully with id 12"
}
  */

};

// ===== USER MANAGEMENT API =====
export const USER_URLS = {
 
  GET_PROFILE: 'https://script.google.com/macros/s/AKfycbzrYmMgujRpzMbPL-783IhDjavuT4hY7lrcrQORyTTsb_gBHC28nGGg_ZPxN5k35oI/exec?id=',
  /*
  params = id 
  METHOD : GET
  contoh response GET_PROFILE :
  {
    "status": "success",
    "data": {
        "id": 2,
        "username": "budi",
        "email": "budi@mail.com",
        "password": "abcd"
    }
}
    */
  USER_UPDATE : 'https://script.google.com/macros/s/AKfycbznONrALGrru66pC-WD7CX49FsnokjxKEARP106z-TEVwBOI7m8HYg4AacSQOSFcKRKBA/exec',
  /*
  METHOD : POST
  contoh body USER_UPDATE :
  {
  "action": "update",
  "id": "2",
  "username": "budi",
  "email": "budi@mail.com",
  "password": "abcd"
}
 contoh response USER_UPDATE :
 {
    "status": "success",
    "message": "User updated successfully"
}
  */
  DELETE_ACCOUNT: 'https://script.google.com/macros/s/AKfycbzf0jE0ax7xHqRstfF4W420E9Sazmm7Tki5sW5Dg0SE6Nih8C1z0KMjUJGKFv9NjnJrVA/exec',
  /*
  METHOD : POST
  contoh body DELETE_ACCOUNT :
  {
  "action": "delete",
  "id": "2"
}
 contoh response DELETE_ACCOUNT :
 {
    "status": "success",
    "message": "User deleted successfully"
}
  */
};

// ===== RATING & REVIEW API =====
export const RATING_URLS = {
 
  SUBMIT_RATING: 'https://script.google.com/macros/s/AKfycbzSvr4Y6cUJ573waTI-H7yzrsoiNRI7TzUUTIfUjI4r7QeMG1jY0FoYL9wBxs627dWZ/exec',
    /*
    CONTOH BODY SUBMIT_RATING :
    METHOD : POST
    {
  "action": "SUBMIT_RATING",
  "userId": 2,
  "productId": 2,
  "rating": 1,
  "review": "JANGAN DI BELI PRODUK KW!"
}
contoh response SUBMIT_RATING :
{
    "status": "success",
    "message": "Rating submitted",
    "data": {
        "id": 8,
        "productId": 5,
        "userId": 2,
        "rating": 5,
        "review": "JANGAN DI BELI PRODUK KW!"
    }
}
    */
  GET_RATINGS: 'https://script.google.com/macros/s/AKfycbyG6_82eS7faFpPH7rQK0ZOjOPNB3rUjSyKPmuf-JQU2svL7jKlUDpqXq8coCYs9j8gnQ/exec',
  /*
  METHOD : GET
contoh response GET_RATINGS :
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "productId": 1,
            "userId": 1,
            "rating": 5,
            "review": "Mantap produk ini!",
            "createdAt": "2025-08-24T08:30:29.000Z",
            "updatedAt": "2025-08-24T08:30:29.000Z",
            "userName": "Budi"
        },
}
  */
  UPDATE_RATING: 'https://script.google.com/macros/s/AKfycbxtPs0w5WQjQt4i2-QO64r7oXva0VLztDlTNMGTYc3_2PwKZ0XKBDrANx-gTweJB0HOfA/exec',
  /*
  METHOD : POST
  CONTOH BODY UPDATE_RATING :
  {
  "action": "UPDATE_RATING",
  "id": 1,
  "rating": 5,
  "review": "Mantap produk ini!"
}
contoh response UPDATE_RATING :
{
    "status": "success",
    "message": "Rating updated",
    "data": null
}



  */
  DELETE_RATING: 'https://script.google.com/macros/s/AKfycbxtPs0w5WQjQt4i2-QO64r7oXva0VLztDlTNMGTYc3_2PwKZ0XKBDrANx-gTweJB0HOfA/exec',
  /*
  METHOD : POST
  CONTOH BODY DELETE_RATING :
 {
  "action": "DELETE_RATING",
  "id": 2      
}

contoh response DELETE_RATING :
{
    "status": "success",
      "message": "Rating deleted",
      "data": null
}
  */
};

 

// // ===== BOOKING API (Future Feature) =====
// export const BOOKING_URLS = {
 
//   CREATE_BOOKING: 'https://your-twenty-first-free-hosting-url.com',
//   GET_USER_BOOKINGS: 'https://your-twenty-second-free-hosting-url.com',
//   UPDATE_BOOKING: 'https://your-twenty-third-free-hosting-url.com',
//   CANCEL_BOOKING: 'https://your-twenty-fourth-free-hosting-url.com'
// };

 
 

// ===== CONTOH PENGGUNAAN =====
/*
// Contoh penggunaan untuk authentication
const loginUrl = AUTH_URLS.USER_LOGIN;
const registerUrl = AUTH_URLS.USER_REGISTER;

// Contoh untuk rating
const submitRatingUrl = RATING_URLS.SUBMIT_RATING;
const getRatingsUrl = RATING_URLS.GET_RATINGS;

// Contoh untuk content
const searchUrl = CONTENT_URLS.SEARCH_ITEMS;
const itemUrl = CONTENT_URLS.GET_ITEM_BY_ID;
*/ 
