import {get, post} from "../../common/api/rest";
const base = "http://localhost:5000";

const queryRuleList = async () => {
    const url = base + "/read";
    const data = {
        "items" : ["RL"]
    }
    return await post(url, data).then((d)=>{
        return d["RL"];
    })
}

const writeLine = async (line) => {
    const url = base + "/write_line";
    const data = {
        "expression": line
    }
    return await post(url, data);
}

const queryAxiomList = async () => {
    const url = base + "/read";
    const data = {
        "items" : ["AX"]
    }
    return await post(url, data).then((d)=>{
        return d["AX"];
    })
}

const utiliseAxiom = async (index) => {
    const url = base + "/use";
    const data = {
        "assume_or_axiom": "axiom",
        "index": index
    }
    return await post(url, data);
}

const queryLocalList = async () => {
    const url = base + "/read";
    const data = {
        "items" : ["CC"]
    }
    return await post(url, data).then((d)=>{
        return d["CC"];
    })
}

const queryLocalVarList = async () => {
    const url = base + "/read";
    const data = {
        "items" : ["LC"]
    }
    return await post(url, data).then((d)=>{
        return d["LC"];
    })
}

const cp2tp = async (conclusion_id, first, last, text) => {
    const url = base + "/cp2tp";
    const data = {
        "conclusion_id" : conclusion_id,
        "first" : first,
        "last" : last,
        "text" : text
    }
    return await post(url, data).then((d)=>{
        return d;
    })
}

const select = async (conclusion_id, first, last, name) => {
    const url = base + "/select";
    const data = {
        "conclusion_id" : conclusion_id,
        "first" : first,
        "last" : last,
        "name" : name
    }
    return await post(url, data).then((d)=>{
        return d;
    })
}

const queryAssistList = async () => {
    const url = base + "/read";
    const data = {
        "items" : ["TM"]
    }
    return await post(url, data).then((d)=>{
        return d["TM"];
    })
}

export {queryRuleList, writeLine, queryAxiomList, utiliseAxiom, queryLocalList,
     queryLocalVarList, cp2tp, select, queryAssistList
}