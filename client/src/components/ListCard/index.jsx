import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@rmwc/card";
import { List, SimpleListItem } from "@rmwc/list";

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
    <Card key={title} className="listcard-card">
      <h3>{title}</h3>
      <List className="listcard-list" twoLine>
        {items.map(item => {
          if (item.link) {
            return (
              <Link key={item.id} to={item.link}>
                <SimpleListItem text={item.title} meta={item.icon} />
              </Link>
            );
          }
          return (
            <SimpleListItem
              key={item.id}
              text={item.title}
              meta={item.icon}
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
