// config/stylePrompts.js

export const prompts = {
    GHIBLI: {
        promptText: `
1. Analyze the Image: Identify the main subjects (characters, objects) and observe the background elements, including furniture, lighting, and colors. Ensure the original color palette, shadows, reflections, and textures are maintained.
2. Ghibli-Style Conversion: Convert the characters into Ghibli-style animation while keeping their facial features, body proportions, age, gender, poses, and colors intact.
3. Output: Provide the final image in PNG format, maintaining the original resolution and aspect ratio.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/ghibli",
    },

    ANIME: {
        promptText: `
1. Analyze the Image: Identify the characters and background elements. Maintain their original positions, colors, lighting, textures, and shadows.
2. Anime-Style Conversion: Transform the image into a clean, vibrant anime style while preserving character features, gender, age, pose, clothing, and background. Avoid any distortions or additions.
3. Output: The final image must resemble high-quality anime art. Return it in PNG format, with the original resolution and no added text.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/anime",
    },

    CYBERPUNK: {
        promptText: `
1. Analyze the input image: Identify the main characters, their clothing, and the background. Maintain body proportions, facial features, and the original pose.
2. Cyberpunk-Style Conversion: Transform the characters and background into a futuristic neon-lit cyberpunk aesthetic. Use vibrant colors like purples, blues, and pinks. Add tech elements like glowing lights, holograms, and chrome textures. Do not change the identity of the subject.
3. Output: The final image should resemble high-quality cyberpunk art in PNG format, keeping the original resolution and no added text or logos.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/cyberpunk",
    },

    CARTOON: {
        promptText: `
1. Analyze the input photo: Identify characters, key elements, facial expressions, clothing, and background. Maintain identity and proportions.
2. Cartoon-Style Conversion: Transform the image into a clean, vibrant cartoon style. Use bold outlines, smooth shading, and simplified features while keeping the subject recognizable. Emphasize expression and posture.
3. Output: Provide the cartoon-style image in PNG format, keeping original resolution and without adding logos or text.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/cartoon",
    },

    SAMURAI: {
        promptText: `
1. Analyze the input photo: Identify the subject and important visual elements such as facial features, body posture, and clothing.
2. Samurai-Style Transformation: Transform the subject into a traditional or stylized Samurai warrior. Include traditional armor, katana, and Japanese elements like a temple, bamboo forest, or battlefield background. Keep the subject’s identity recognizable.
3. Artistic Style: Apply a dramatic, cinematic art style with strong lighting, shadows, and textures. Refer to Japanese ink art, anime samurai designs, or feudal-era armor aesthetics.
4. Output: Provide the final image in PNG format with the same aspect ratio. No text or logos.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/samurai",
    },

    RETRO: {
        promptText: `
1. Analyze the subject in the photo: focus on their pose, clothing, and background elements.
2. Retro-Style Transformation: Apply a vintage aesthetic. You can go for an 80s synthwave style with neon lights, chrome textures, and purple-pink-blue gradients, or a 90s nostalgic pixel-art or VHS film style.
3. Background: You can use retro elements such as CRT TVs, cassette tapes, arcade machines, grid lines, sunsets, etc., while preserving the subject.
4. Artistic Style: Should resemble retro posters, pixelated filters, or analog film looks. Add textures like scanlines, VHS noise, or retro glows.
5. Output: Return the final image in PNG format without adding any logos or text.
    `,
        referenceFolder: "SPIRITED-ART-BOT/references/retro",
    },
};
