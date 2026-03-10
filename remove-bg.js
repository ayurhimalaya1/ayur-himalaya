const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

async function removeBackgrounds() {
    try {
        console.log("Processing light logo...");
        const lightLogo = await Jimp.read(path.join(__dirname, 'public/logo-light.png'));

        // Remove white and near-white backgrounds from the light logo
        lightLogo.scan(0, 0, lightLogo.bitmap.width, lightLogo.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is very close to white, make it transparent
            if (red > 240 && green > 240 && blue > 240) {
                this.bitmap.data[idx + 3] = 0; // Set Alpha to 0
            } else if (red > 200 && green > 200 && blue > 200) {
                // Feather edge for anti-aliasing
                this.bitmap.data[idx + 3] = 128;
            }
        });

        // Write the transparent light logo
        await lightLogo.writeAsync(path.join(__dirname, 'public/logo-light-transparent.png'));
        console.log("Light logo processed successfully.");

        console.log("Processing dark logo...");
        const darkLogo = await Jimp.read(path.join(__dirname, 'public/logo-dark.png'));

        // Remove black and near-black backgrounds from the dark logo
        darkLogo.scan(0, 0, darkLogo.bitmap.width, darkLogo.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is very close to black, make it transparent
            if (red < 15 && green < 15 && blue < 15) {
                this.bitmap.data[idx + 3] = 0; // Set Alpha to 0
            } else if (red < 40 && green < 40 && blue < 40) {
                // Feather edge for anti-aliasing
                this.bitmap.data[idx + 3] = 128;
            }
        });

        // Write the transparent dark logo
        await darkLogo.writeAsync(path.join(__dirname, 'public/logo-dark-transparent.png'));
        console.log("Dark logo processed successfully.");

    } catch (error) {
        console.error("Error processing images:", error);
    }
}

removeBackgrounds();
