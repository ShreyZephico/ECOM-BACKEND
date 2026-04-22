import CombinationService from "./service";
import { Module } from "@medusajs/framework/utils";

export const COMBINATIONMODULE = "combination"

export default Module(COMBINATIONMODULE,{

    service:CombinationService,
})