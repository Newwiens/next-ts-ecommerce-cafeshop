import { v2 as cloudinary } from "cloudinary";

//Account config
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME");
}

if (!API_KEY || !API_SECRET) {
  throw new Error("CLOUDINARY_API_KEY of CLOUDINARY_API_SECRET");
}

//type CLoudinary config
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

//Config root + sub folders

const ROOT_FOLDER = "Ice cafe and bubble Tea";
const PRODUCT_FOLDER = `${ROOT_FOLDER}/png`;
const SCENE_FOLDERS = [
  `${ROOT_FOLDER}/IcedCoffee`,
  `${ROOT_FOLDER}/IcedTea`,
  `${ROOT_FOLDER}/MilkTea`,
];

//Types
type CloudinaryApiResource = {
  //gevonden items resultaat
  public_id: string;
  secure_url: string;
};

export type CloudinaryImage = {
  id: string;
  url: string;
};

/*--------------  -------------*/
// Product Foto's (png)
// Promise<CloudinaryImage[]> = deze async functie geeft later een array CloudinaryImage terug
// CloudinaryImage = type voor één afbeelding (met id, name, url)

export async function getProductImages(): Promise<CloudinaryImage[]> {
  // Haal gegevens op uit Cloudinary
  const result = await cloudinary.search // standaard search-API uit het Cloudinary-pakket
    .expression(`folder:"${PRODUCT_FOLDER}"`) // filter: alleen afbeeldingen uit de map PRODUCT_FOLDER (bijv. 'Ice cafe and bubble tea/png')

    .max_results(100) // maximaal 100 resultaten in deze zoekopdracht
    .execute(); // voer de zoekopdracht echt uit (async call naar Cloudinary)

  // Resultaat uit Cloudinary omzetten naar eigen type (CloudinaryImage[])
  const resources = result.resources as CloudinaryApiResource[];
  // resources --> standaard property in Cloudinary-response = lijst met gevonden items

  return resources.map((r) => {
    const fullId = r.public_id as string;
    // beschouw r.public_id als string (type hint voor TypeScript)

    const id = fullId.split("/").at(-1) as string;
    /* 
      - .split("/") knipt de string op elke "/" in een array
        bijv. "Ice cafe and bubble tea/png/icedcoffee-orgin"
        → ["Ice cafe and bubble tea", "png", "icedcoffee-orgin"]
      - .at(-1) pakt het laatste element van die array
        → "icedcoffee-orgin"
      - as string: vertel TypeScript dat dit een string is
    */

    return {
      id,

      url: r.secure_url,
    };
  });
}

/**
 * Scenefoto's (IcedCoffee, IcedTea, MilkTea)
 */

export async function getSceneImages(): Promise<CloudinaryImage[]> {
  const expression = SCENE_FOLDERS.map((folder) => `folder:"${folder}"`).join(
    " OR "
  );

  const result = await cloudinary.search
    .expression(expression)
    .with_field("context")
    .max_results(200)
    .execute();

  const resources = result.resources as CloudinaryApiResource[];

  return resources.map((r) => {
    const fullId = r.public_id as string;
    const id = fullId.split("/").at(-1) as string;

    return {
      id,

      url: r.secure_url,
    };
  });
}
