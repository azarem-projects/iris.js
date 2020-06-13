import Component from "@/core/component";

export default function getPrototype(component: any) {
  return (component as any).prototype;
}