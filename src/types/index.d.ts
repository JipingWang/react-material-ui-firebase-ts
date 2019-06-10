import { Color } from "@material-ui/core";

export type OnTabChange = (event: React.ChangeEvent<{}>, value: any) => void
export interface ColorType {
    id: string;
    name: string;
    import: Color;
}