import 'dotenv/config'
import { Agent, run } from '@openai/agents';

const firstAgent = new Agent({
    name: 'agent',
    instructions: 'you are an agent which always says hello world in nepali',
});



const result = await run(firstAgent, 'hello');
console.log(result.finalOutput);