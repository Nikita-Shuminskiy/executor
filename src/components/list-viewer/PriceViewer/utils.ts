import Outerwear from "../../../assets/Images/Сlothing/Outerwear.png";
import ShirtsJackets from "../../../assets/Images/Сlothing/ShirtsJackets.png";
import tShirtTop from "../../../assets/Images/Сlothing/T-shirts-tops.png";
import PulloversSweaters from "../../../assets/Images/Сlothing/PulloversSweaters.png";
import PantsShorts from "../../../assets/Images/Сlothing/PantsShorts.png";
import SkirtsDresses from "../../../assets/Images/Сlothing/SkirtsDresses.png";
import UnderWearSocks from "../../../assets/Images/Сlothing/UnderwearSocks.png";
import ChildrenClothing from "../../../assets/Images/Сlothing/ChildrensСlothing.png";
import Bedding from "../../../assets/Images/Сlothing/Bedding.png";

export const getInfoPriceElement = (id: string) => {
    let DATA_PRICES = {
        '1': {
            img: Outerwear,
            description: 'Coats, jackets',
            name: 'Outerwear'
        },
        '2': {
            img: ShirtsJackets,
            description: 'Shirts, as well as Blazers and other items of clothing associated with a more formal style',
            name: 'Shirts Jackets'
        },
        '3': {
            description: 'Tanks, T-shirts, and other Sleeveless or Short-sleeved Tops',
            img: tShirtTop,
            name: 'TShirts Tops'
        },
        '4': {
            description: 'Sweaters, Cardigans, and other Warm Upper Body Clothing',
            img: PulloversSweaters,
            name: 'Pullovers Sweaters'
        },
        '5': {
            description: 'Pants, Trousers, Jeans, and other Legwear, including Shorts',
            img: PantsShorts,
            name: 'Pants shorts'
        },
        '6': {
            description: 'Garments with skirts or dresses',
            img: SkirtsDresses,
            name: 'Skirts dresses'
        },
        '7': {
            description: 'Underwear items, including briefs, bras, socks, and other intimate apparel worn directly on the body.',
            img: UnderWearSocks,
            name: 'Underwear socks'
        },
        '8': {
            description: 'Onesies, rompers, swaddles, and other wardrobe essentials designed exclusively for the convenience and comfort of infants and young children.',
            img: ChildrenClothing,
            name: 'Children clothing'
        },
        '9': {
            description: 'Sheets, pillowcases, duvet covers, and other bedding items.',
            img: Bedding,
            name: 'Bedding'
        },
    }
    return DATA_PRICES[id]
}