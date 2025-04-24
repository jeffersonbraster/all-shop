import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      required: true
    },    
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["no-refunds", "1 day", "3 days", "7 days", "14 days", "30 days"],
      defaultValue: "30 days",
    },    
  ]
}