import MappingService from "./service";
import { Module } from "@medusajs/framework/utils";

export const MAPPING_MODULE = "mapping"

export default Module(MAPPING_MODULE,{
    service:MappingService,
})