import axios from "axios";


const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
const chatId = process.env.NEXT_PUBLIC_CHAT_ID;
const telegraphToken = process.env.NEXT_PUBLIC_TELEGRAPH_TOKEN;


console.log("Bot token:" + botToken)


export async function POST(request: Request) {
    const formData = await request.json()

    const message = "#todo\n\n" + Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n');

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = { chat_id: chatId, text: message, parse_mode: 'markdown' };

    try {
        await axios.post(url, data);
        return new Response("Form submitted successfully!", {
            status: 200
        })
    } catch (error: any) {

        const encodedErrorMessage = JSON.stringify(error.response.data).replace(/"/g, '\\"').replace(/^{/, "%0A{%0A").replace(/,/g, ",%0A").replace(/}$/, "%0A}%0A");
        const telegraphResponse: any = await axios.post(
            `https://api.telegra.ph/createPage?access_token=${telegraphToken}&title=${encodeURIComponent(error.response.data.description)}&author_name=iSongArtist&content=[{"tag":"p","children":["${encodedErrorMessage}"]}]&return_content=false`
        ).catch((err) => {
            console.log(err);
        });


        const telegraphUrl = telegraphResponse.data.result.url;
        const telegraphData = {
            chat_id: chatId,
            text: telegraphUrl,
            parse_mode: 'markdown',
        };
        await axios.post(url, telegraphData);

        return new Response("Error submitting form", {
            status: 500
        })
    }

}