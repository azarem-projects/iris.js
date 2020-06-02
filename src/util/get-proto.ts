import Component from "@/core/component";

export default function getProto(component: Component) {
  return (component as any).__proto__;
}