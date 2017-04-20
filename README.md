[How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

# Roomours

This application is intended to simulate a booking application. In the context of this project, the application is intended to be used by businesses of unique hotels/resorts, to facilitate the reservations of their customers. This application currently only have functionalities of an MVP(minimal viable product).


## Getting Started

Clone the Repo
npm install the modules
Have fun exploring the application.

## How to use
### Summary
This application is catered towards 2 roles: Users and Admins. Admins will be reserved for the business owners, who get to determine the rooms that are available for public to book. For the purpose of this application, the admin key is 'admin', and will be customized for each business owner.

Users are members of the public who are traveling around the world and in search for a unique lodging experience.

The eventual goal of this app is to connect all the business owners to be on the platform, such that users can search among all the businesses and identify other unique spots in the world that they might like to visit/travel/lodge at in future.

### Functionalities

1) Admins are currently able to add rooms, update the availability of the rooms and delete room listings. In each listing, admins determine the number of beds, price per night, and duration of availability.

2) Users are currently able to book rooms that are created and made available by the admins. Upon reservation of the room, users are only able to cancel their reservation, but not update their reservation. Furthermore, users are able to search for all available rooms and their various prices, within a specific date range, upon specifying the number of beds they will require.

## Live Version

This app is deployed on [https://dry-everglades-61064.herokuapp.com/](https://dry-everglades-61064.herokuapp.com/)


## Built With
* Node-js
* Express, EJS
* CSS
* HTML
* mLab(mongoDB Hosting)
* Mongoose
* Bootstrap CSS Framework
* Heroku


## Development
### The Approach
This idea for the app came up as part of achieving an app built with the following features:
* Two Models: Rooms, and Users
* RESTful Routes for both Rooms and Users
* Partitioned Views and Access levels for Admins vs. Users
* Login and Authentication using Passport

### Initial planning
Use Cases
![Use Cases](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/Use%20Cases.jpg)

ERD
![ERD](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/ERD.pdf)

Routes Planning
![routes](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/Routes.PNG)


### Calculation of score
As Ace has a variable score depending on the situation, the code is designed such that Ace always counts as 11, and only counts as 1 point when the score exceeds 21. This assumption is based on a rational player gameplay logic where the player is intending to achieve the highest score possible.

### Betting chips
Visuals for stacking of the chips to reflect amount player bets is inspired by yisheng90. Each additional bet of value 10 adds an image at a slight displacement from the previous, creating a vision of a stack of chips.

### Process flow
[Process flow](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Blackjack.xml#R7V1bj6M4Fv41eawIX%2FDlsau6q3dHGqmlHml3HylCJUyTEBFSl%2F71awMGbENCCFCZSiJNTzDggM8537m7Zuhh%2FfY98barP%2BNFEM2gs3iboa8zCAF2iPifHHnPRwh38oFlEi7yodrAz%2FB3UNypRvfhItgVY%2FlQGsdRGm71QT%2FebAI%2F1Wb0kiR%2B1S97jqOFNrD1loF2kxz46XuReo65W43%2FJ1ykq3ycQVKN%2FysIl6vitwEgPD%2Fz5Pm%2Flkm83xS%2FuIk3QX5m7alpih%2FdrbxF%2FFobQt9m6CGJ4zT%2Ftn57CCK5sMaa7dJ39aAzdL9K15E4AOJrdvqx5WbQ5WbxYkmw0Ra0bT6Y3%2FDiRftivl3qJan1K%2BItt%2FLr%2Bm0pmWX%2BHMWv%2FkpcOU%2BDZB1uvDROxM8%2Fh1H0EEfyu7gLPWYfMb5Lk%2FhXUDvjZJ%2FyjKKOfBvxA4tQPL66Olv7avhrmAhmCeNNdiqRt90%2Fx9Xl2eSAI1SM%2Fyxewjm2UMXSvgRJGrzVhoqF%2Bx7E6yBN3sUlxVlIClIW8oHyo9eK04Ai9qrGZUixeMHey3Liik7iS0GqZrIhi2zbyPMDyblBKudeC949hYoLL%2FWujn7YUQhRUJA2kNDlNgnZACTEFgl%2FRN57kOSAKJZ170uZgsRbb8X7bp522%2By1SSQe4n4RvoivS%2FnVTwIvFTgrViObYKeuEU9Qu6zhTnPycCNR21tLPoqf%2FpaY3DLVja8O8RUCBl9hQKZjLGIx1vecpDpbHWOGiq1yjujJUzc%2BOgOfqMZFkGGbi9Q1GhfB87mIWVx0LzTMrz%2FEfzP0eArlAj%2FcZct5ZdQzrAMOoE09B9jUowNgALcI1GURQDMtECLEogXouGC7eJ%2F4gWZsCgNzGShjKB8KFsqUb1nUJIi8NHwJtLnPWSFgm%2BEjL5FYmeT9v5LX5pir4%2F%2BJ4ztn7jjlyI8gCcXbBEnBlZ1WFtkrS%2BiHLa3tpNTe3UWw%2FvLi3RFpe%2FexKfIWpgVBqDrOn4kzVhz3IgexyYE%2FjBq2r%2FAu1bpBIYFqaT%2Bs1BffwGNjuK4BiiEb4gcAX4I17GXKD6thL25wzRThzlpv27C3xUFwgVrNIHqKX79VA%2FfZgDixipPwt1h2L5pAEir5BJjp8okYa5PPSoBc6GoC5JQC1UuAKOuvKjT92kDkcrCJysV0P%2BJQus%2BKncQtQGMo4CCqT5I%2FfXFfPeBiTMVcos2EXONp8le2JvqSJN577bKtvGDX%2FsiGBLiOFgcSX%2FIJK5YuV7Abl7sWlz94yWJ3hpvhF%2FdLL7TZ6T3qfGyVB517Ha2e8M3tOOi%2BQsN9dYkNn6O5r8D2XzfxJasrLwqXkmq%2BuF%2Bi3BA0wNDAGzahArNdv49UYC54fITfuptyHOmmnEtaFFFN5zFIdZ1H23VeJ%2F0FHG4rMIWZRzVYwQR3uvvPG4RwIP2GiDMXmokCXPyrMx90cD9lh%2BiheQkD8%2FKM%2BBeNoggx0UWJF8eDaUJ%2BUeIyoLuOz2DhIZn0veWWrlxo3djCWT2ID20z6JMQn36EuX0upZGhNinqhil9KE%2FHoHzNoaopsTZX6mr5pCL3HNU%2ButXKSF8uAoem5XA0NEHA4qlF4r1afHVBxm8rj3S3dRHT7RwAoKsckAnMXdeO12y93WcPkAmzyHDyACBwDqdbd2LHJQcFUMbZTPMDWkO6NUeAA1d3BDArw2OXiL4qyN8nTlbQ%2Fc6lFs2HUuTYUL8nW2zmMw7tG1D9dwAd1jcgtpHwQ9bpLMTYvaTXLZHaAaqoHsoEzC6m4MzmV5NneoGUHQv5%2FMkTSHU%2FHbpwMq2gfnrCtGxlcjtU0xicw%2BMawxVusp7OJGUsqV%2FusAHSSUdI75w8bLOn2RwwjhlxXegSivRUBXbcfnCOoM5QSMVMhjehqW1VqLxEPnS8ni7MkxGRvxeLmUF173zEs0yBOIHnr2aqOu%2BWkhgkJUFVSHKKlAT9tFEeFc%2Brg83levQEX35ciNrpq%2F1WyGxWgJkEi1Dao86Tt5PIYgFGLCtw9RLuG1ycDBd3GBlwwZ0GJ2c0uLCt%2Fs9vNJYZSrXirm2lj2Y02lZ6EhR9LHn18s3R6iI2RtG6SpxNUbBKJ69Y1aI%2BRvrXpaeXY2oqdCKDHap%2BtVLoYE8FifCc1D5cD8mi8TJoCjauCiy5WQM2XdiV2faJtdjBZvFF9l%2BKIz%2FydrvQbxUdjIkuOpy2BkxrnrZWoyHrn5FyvfuVCzYU3CqlcIoZ6zYsuho7U1SNsj8OeoZGkREMU%2BUMY4imbcdcXyXWnQGFmNk9gqPJ6mVVYp0WT8ukWounEYCPx9M4RzqgIOy2AUo3bGgoJWa8IzaUlVjKYVS5ZRuwh3KB77BuSLuqFetUpLgDQH9ogoz43YBQYRdBFX2kQpfY2vyA7R37%2B3VGziuzvU0F4YIGFmsCmkHaxeAJSD%2FsiyOgh2aExDhzUFmitt%2BuNKCGtmyARejSuHGCZcSsJi8XnYxkF2K9IGB498yYorP54vBDjgZwCKmf75b27QFY3A7plvH5YwmCvCbHyWL7WamIjC6cG6a70phDQx2KoxCtjnygIVZH2dxtZ%2BTOYm87RGUbSdGScrSJRaWWrHDuSzaNWIN2FrkxTi%2FGMfqbqANtpmnSFMAZQlV0McyPqAqLKo%2BPMuPxT1AGhg9KcM9eOHMi6oyWlikN8XFIVndgiNE%2FiauBXsFE3jWYOA31ITYysWYDY%2BciL24k5Uw2GpL6toHrrwL%2FV9Zv%2BDyrJeePKf9M6%2FvxertPM2zf%2BXHSf3eUrNZgJWh0Kwzo5zYhbJoPZdHhJM2KzgBOQydYYQ7XYcXBp3sTvXIU08AKgHoqg%2FUtNgLYcCiBWTUwJK50qQwZgvyIGYXJDjg9LKZplR6dXGOSH7E5r32o7hcygLXTPUNiHM9r%2FYbAjMnDPv2IvdjmlB7nYRETEKivLIIfE24pDfGRZKfa20XvA%2BB5brdvqunS5EaFt0u0U5n00yMzerQYWCmMIQXAjhd%2F%2BXeDvVRYV1UFZnYBILeQyzkhF2ASusFiQqdmM7rvDmV3udlyP11Wq0SM7tUihiqu6ebh4rpKKnUNZdNpsB0AdF0oqNTXqWcHe%2F5ldH%2F8nn%2BqszhjA%2B9%2Bo%2Fbyu%2FJOTbGwE3ZqgoatzM63GOD946Pz5Z8QdnONdC52507tA3vKqzEtdYwnG1Dtd9obrTcB696yC3SMlnuifqYgnGsE4VBf6hOD%2BmBE6o%2FhLFfULw1%2BZNSdMOes4rJLIz0xSI%2FhEDBg7pJjbvkzJB8MUILYhQ8oJBofyFK5o%2FVHjmv08yFwOnI0sY%2B2jY7yfy6EpwCnB7Py4nmb2nJODs2pvRYqz2O0iqTSfr2ufR1AlRQvF1kQd8J9HUCn%2FePOFm9ZT2Ns9AaPSzdHhnTjs2S7eZs3BcGXItzgYG0%2F5WwI2TY8Lg5G1B928OgKWgZ0P5qp%2BMwUEg3t3Plk4Wq166F6b%2FpR4WqFYoOVB2o9R61NE61reMG5PLNHoYw4nlzCTKmGTUaImhD3EHQNCDkNf3DpL8nux2UgCXbhb%2B%2BphJkidCWudu9n7lcx4u3TeJf%2F8TR5g2piiIJnOZUUldD3oi%2FFcBrLMPhu6%2FnhZvmXPPh6h4eRNQwMujkNTfbK0dTijbidQ1rkSxxWfyItp0j1R%2BjQt%2F8D)

## Authors

Jerel Lim - jerel-lim

## Acknowledgments
This application is built for programming practice purposes only. Room reservations logic was inspired by Lee Yi Sheng - yisheng90
