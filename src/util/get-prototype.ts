import Component from "@/core/component";

export default function getPrototype<T>(component: any): T {
  return (component as any).prototype;
}