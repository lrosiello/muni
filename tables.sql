-- Table: public.categories

-- DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    category_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    order_number integer NOT NULL DEFAULT nextval('categories_order_number_seq'::regclass),
    available boolean NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_category_name_key UNIQUE (category_name),
    CONSTRAINT categories_order_number_key UNIQUE (order_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

-- Table: public.layers

-- DROP TABLE IF EXISTS public.layers;

CREATE TABLE IF NOT EXISTS public.layers
(
    id integer NOT NULL DEFAULT nextval('layers_id_seq'::regclass),
    layer_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    order_number integer NOT NULL DEFAULT nextval('layers_order_number_seq'::regclass),
    category character varying(255) COLLATE pg_catalog."default" NOT NULL,
    available boolean NOT NULL,
    CONSTRAINT layers_pkey PRIMARY KEY (id),
    CONSTRAINT layers_order_number_key UNIQUE (order_number),
    CONSTRAINT fk_category FOREIGN KEY (category)
        REFERENCES public.categories (category_name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.layers
    OWNER to postgres;


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    surname character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    user_role user_role NOT NULL DEFAULT '0'::user_role,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;