# Poke-Team React App

## Netlify Link
https://skruds004-poke-teams.netlify.app/

## Technologies Used
React was used to create this application, using components to display data and state management to update components
Redux was used to centralize the state management of the application and common actions like addToTeam and removeFromTeam are reducers
Thunk Middleware is used to fetch data from the Poke-API into the store

Most of the pokemon related logic goes through the Redux store. The state for the team and all the fetched pokemon are stored in this store.
The store also keeps track of whether fetching is loading, fulfilled or rejected and this is used to determine what is rendered on most pages

On most pages there is both the Navbar and the TeamMenu
The Navbar is used simply with a React Router to navigate the site
The TeamMenu keeps track of the Pokemon you have added to your team on the side of the screen

The Main Pokemon Page lists all pokemon from the API, and uses pagination to keep it from filling up the screen too much.
The page is populated with "Pokemon Cards" which represent the pokemon that are fetched from the API. Because the API only sends
a name and a URL for plural Pokemon fetches, each card links to the Description Page, which renders all of the data of a single Pokemon

The Description Page uses the name of a Pokemon on either a PokemonCard or a TeamCard to fetch, then render a fair amount of information
about a single Pokemon. 

Lastly is the search page which is similar in function to the main pokemon page, but uses a select dropdown as well as an input field
to search for Pokemon in a couple of different ways. You can either search by type (which displays all Pokemon of a certain Pokemon type
ie. Poison, Normal, Psychic, etc...) or you can search by a search query. This will update when you change data in the input field and
display all the cards with names that include your query (this way you don't have to match things exactly)

Every Pokemon Card has an add button to add the Pokemon to your team (with 2 restrictions which are no duplicates and your team can't be
larger than 6 Pokemon)
Every Team Card has a remove button to remove that Pokemon from your team

## Features To Be Implemented:
1. A Team Page which displays the basic descriptions of each of your Pokemon
    - Additionally add some calculations to tell user what their team may need (type coverage, more attack, more defense, etc...)
2. Clean up the search page
    - Add Pagination to results
    - Instead of search buttons have a toggle search type button that renders the input field/dropdown based on the toggle value
    - More ways to search (By ability, second type search, generation) this is harder without making a lot of API calls and there
      may not be an efficient way to do this with Poke-API
3. Use Localstorage to save team data and single pokemon data for descrption pages
4. Be able to add held items to and change certain properties of your team Pokemon (shiny toggle, ability selection)
5. Have description page still load description when refreshed, and put an addToTeam button on the description page
6. Possibly mess with the site styling (It has a bit of a ketchup and mustard sort of look)
7. Style the Pokemon Cards to look more like a pokedex (original plan)
8. Don't have another 3 day power outage (very important)


