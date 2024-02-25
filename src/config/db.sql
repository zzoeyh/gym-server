create table role
(
    id          varchar(255) not null
        primary key,
    name        varchar(255) null,
    description varchar(255) null,
    createdAt    datetime     null,
    updatedAt    datetime     null
);

create table user
(
    id       varchar(255) not null
        primary key,
    rid      varchar(255) null comment '角色id',
    username varchar(255) null,
    password varchar(255) null,
    avatar   varchar(255) null,
    createdAt datetime     null,
    updatedAt datetime     null,
    constraint user_role_null_fk
        foreign key (rid) references role (id)
);

create table announcement
(
    id          int          not null
        primary key,
    title       varchar(255) null comment '公告标题',
    description varchar(255) null comment '公告内容',
    createId    varchar(255) null comment '创建人',
    createdAt    datetime     null,
    updatedAt    datetime     null,
    beginAt     datetime     null comment '公告开始时间',
    endAt       datetime     null comment '公告结束时间',
    type        int          null comment '公告类型',
    constraint announcement_user_null_fk
        foreign key (createId) references user (id)
)
    comment '系统公告表';

create table equipment
(
    id        int          not null
        primary key,
    name      varchar(255) null comment '器材名称',
    parentId  int          null comment '父级id',
    total     int          null comment '器材数量',
    available int          null comment '可用数量',
    damage    int          null comment '损坏数量',
    lease     int          null comment '租赁数量',
    price     int          null comment '单个价格',
    createId  varchar(255) null comment '创建人',
    createdAt  datetime     null,
    updatedAt  datetime     null,
    constraint equipment_user_null_fk
        foreign key (createId) references user (id)
)
    comment '器材表';

create table finance
(
    id       varchar(255) not null comment '报表id',
    total    int          null comment '收入总额',
    profit   int          null comment '盈利金额',
    beginAt  date         null comment '开始日期',
    endAt    date         null comment '结束时间',
    type     int          null comment '营收类型',
    createdAt datetime     null comment '创建时间',
    createId varchar(255) null comment '创建人id',
    loss     int          null comment '损耗金额',
    constraint finance_user_null_fk
        foreign key (createId) references user (id)
);

create table umpire
(
    id          int          not null comment '裁判id'
        primary key,
    name        varchar(255) null comment '裁判名称',
    description varchar(255) null,
    createId    varchar(255) null comment '创建人',
    createdAt    datetime     null comment '创建时间',
    updatedAt    datetime     null comment '更新时间',
    constraint umpire_user_null_fk
        foreign key (createId) references user (id)
)
    comment '裁判信息(公告)表';

create table venue
(
    id           int          not null comment '场地id'
        primary key,
    name         varchar(50)  null comment '场地名称',
    description  varchar(255) null comment '场地描述',
    img          varchar(255) null comment '场地图片',
    createId     varchar(255) null comment '创建人',
    createdAt     datetime     null,
    updatedAt     datetime     null,
    announcement varchar(255) null comment '场地公告',
    constraint venue_user_null_fk
        foreign key (createId) references user (id)
)
    comment '场地表';

create table race
(
    id          int          not null
        primary key,
    title       varchar(255) null comment '赛事标题',
    description varchar(255) null comment '赛事描述',
    createId    varchar(255) null comment '创建人',
    beginAt     datetime     null comment '赛事开始时间',
    endAt       datetime     null comment '赛事结束时间',
    vid         int          null comment '赛事场地id',
    reid        int          null comment '器材组id',
    umpire_id   int          null comment '裁判id',
    status      int          null comment '状态',
    createdAt    datetime     null comment '创建时间',
    updatedAt    datetime     null comment '更新时间',
    constraint race_umpire_null_fk
        foreign key (umpire_id) references umpire (id),
    constraint race_user_null_fk
        foreign key (createId) references user (id),
    constraint race_venue_null_fk
        foreign key (vid) references venue (id)
);

create table race_equipment
(
    id       int          not null
        primary key,
    createId varchar(255) null comment '创建人',
    rid      int          null comment '赛事id',
    eid      int          null comment '器材id',
    group_id int          not null comment '器材组编号',
    constraint race_equipment_race_null_fk
        foreign key (rid) references race (id),
    constraint race_equipment_user_null_fk
        foreign key (createId) references user (id),
    constraint race_equipment_venue_null_fk
        foreign key (eid) references venue (id)
);

alter table race
    add constraint race_race_equipment_null_fk
        foreign key (reid) references race_equipment (group_id);

create index race_equipment_group_id_index
    on race_equipment (group_id);

create table user_venue
(
    id       int          not null
        primary key,
    createId varchar(255) null comment '预定人',
    vid      int          null comment '场地编号',
    beginAt  datetime     null comment '开始使用时间',
    endAt    datetime     null comment '结束使用时间',
    status   int          null comment '状态',
    type     int          null comment '使用类型',
    createdAt datetime     null comment '创建时间',
    updatedAt datetime     null comment '更新时间',
    constraint user_venue_user_null_fk
        foreign key (createId) references user (id),
    constraint user_venue_venue_null_fk
        foreign key (vid) references venue (id)
)
    comment '用户预订场地表';

create table venue_price
(
    id       int          not null
        primary key,
    vid      int          null comment '场地id',
    type     int          null comment '是否有灯光',
    price    int          null comment '每小时单价',
    createId varchar(255) null comment '创建人',
    createdAt datetime     null,
    updatedAt datetime     null,
    constraint venue_price_user_null_fk
        foreign key (createId) references user (id),
    constraint venue_price_venue_null_fk
        foreign key (vid) references venue (id)
)
    comment '场地价格表';

