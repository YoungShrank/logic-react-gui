// 规则区
import React, { useState } from "react";
import useRuleAreaHandler from "../../handler/useRuleAreaHandler";
import useTermHandler from "../../handler/useTermHandler";
import useTermStateRegister from "../../message/receiver/useTermStateRegister"
import TermMapArea from "./common/TermMapArea";

function RuleArea() {
    return (
        <TermMapArea stateName={"ruleState"}></TermMapArea>
    )
}


export default RuleArea;