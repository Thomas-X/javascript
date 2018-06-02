import poll from "./poll";

export default [
    {
        cmd: 'poll',
        args: [{ arg: 'create', params: ['name'] }, 'dd'],
        execute: poll
    }
]
