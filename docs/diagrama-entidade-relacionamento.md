```mermaid
erDiagram

ROOM ||--o{ RESERVATION : contains

ROOM {
  int id
  string name
  string floor
  string wing
  string type
  int capacity
  datetime createdAt
}

RESERVATION {
  int id
  string professor
  date date
  time start_time
  time end_time
  ROOM room_id
  datetime createdAt
}
```
