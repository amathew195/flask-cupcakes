"use strict";

const $cupcakesList = $("#cupcakes");
const $form = $("#addcupcakeform");
const $addButton = $("#addButton");
const $flavor = $("#flavor");
const $size = $("#size");
const $rating = $("#rating");
const $image = $("#image");

/** This function gets cupcakes from the API and displays it on the HTML */
async function loadCupcakeList() {

  const response = await axios.get("/api/cupcakes");
  const cupcakes = response.data.cupcakes;
  for (const cupcake of cupcakes) {
    let $singleCupcake = $('<div></div>');
    $singleCupcake.append(`<h5>${cupcake.flavor}</h5>`);
    $singleCupcake.append(`<img src=${cupcake.image}>`);
    $singleCupcake.append(`<p>${cupcake.size}</p>`);
    $cupcakesList.append($singleCupcake);
  }
}

loadCupcakeList();

$form.on("submit", addNewCupcake); //make this 'submit'

/** This function takes the inputs on the form and creates a new
 * cupcake and updates the display.
 */

async function addNewCupcake(evt) {

  evt.preventDefault();
  const flavor = $flavor.val();
  const size = $size.val();
  const rating = $rating.val();
  const image = $image.val();
  const newCupcake = await updateCupcakeList(flavor, size, rating, image);
  updateCupcakeDisplay(newCupcake);
}

/**This function sends the new cupcake information to the API and
 * returns the new cupcake instance
 */

async function updateCupcakeList(flavor, size, rating, image) {

  const response = await axios.post(
    "/api/cupcakes",
    { "flavor": flavor, "size": size, "rating": rating, "image": image }
  );
  console.log(response.data.cupcake);
  return response.data.cupcake;
}

/** This function updates the display when adding new cupcakes */
function updateCupcakeDisplay(cupcake) {


  let $singleCupcake = $('<div></div>');
  $singleCupcake.append(`<h5>${cupcake.flavor}</h5>`);
  $singleCupcake.append(`<img src=${cupcake.image}>`);
  $singleCupcake.append(`<p>${cupcake.size}</p>`);
  $cupcakesList.append($singleCupcake);
}
