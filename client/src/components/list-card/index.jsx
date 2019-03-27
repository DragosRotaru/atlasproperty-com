import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@rmwc/card";
import { List, SimpleListItem } from "@rmwc/list";
import Style from "./style.css";

export function ListCard(
  title: string,
  items: Array<{
    id: string,
    title: string,
    onClick?: (id: string) => void,
    link?: string,
    icon?: string,
  }>
) {
  return (
    <Card key={title} className={Style.container}>
      <h3 className={Style.title}>{title}</h3>
      <List className={Style.list} twoLine>
        {items.map(item => {
          if (item.link) {
            return (
              <Link key={item.id} to={item.link}>
                <SimpleListItem text={item.title} metaIcon={item.icon} />
              </Link>
            );
          }
          return (
            <SimpleListItem
              key={item.id}
              text={item.title}
              metaIcon={item.icon}
              onClick={() => {
                if (item.onClick) {
                  item.onClick(item.id);
                }
              }}
            />
          );
        })}
      </List>
    </Card>
  );
}
