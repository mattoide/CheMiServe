import { Icon } from "./icon";
import { Type } from "./type";
import { Unit } from "./unit";

export interface Product {
    id: string
    name: string
    quantity?: number
    measureUnit?: Unit
    description?: string
    type?: Type
    icon?: Icon
}
