import LookupService from "./service";
import { Module } from "@medusajs/framework/utils";

export const LOOKUP_MODULE = "lookup"

export default Module(LOOKUP_MODULE,{

    service:LookupService,
})