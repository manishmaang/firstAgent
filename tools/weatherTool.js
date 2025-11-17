// import 'dotenv/config'
import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';


const weather_tool = tool({
    name: "get_weather", // tool name is used by agent to decide what tool to use
    description: "gets the current weather of a city", // tells agent when to use this tool
    parameters: z.object({
        city: z.string().describe("name of the city whose weather data we want")
    }), // used in the execute function
    execute: async ({ city }) => { // this function will be executed to fetch the current data 
        const response = await fetch(`https://wttr.in/${city.toLowerCase()}?format=%C+%t`);
        const text_output = await response.text();
        console.log(text_output);
        return `current weather of ${city} is like ${text_output}`
    }
})

const weather_agent = new Agent({
    name: "weather_reporter",
    instructions: `you are a weather reporter, which gives weather report about a city`,
    tools: [weather_tool],
})

export async function get_weather(city = "bhopal") {
    const result = await run(weather_agent, `what is the current weather in ${city} ?`);
    console.log(result.finalOutput);
}
