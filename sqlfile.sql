--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id bigint NOT NULL,
    userid bigint,
    type text
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: controllers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.controllers (
    id bigint NOT NULL,
    type text,
    name text,
    openlink text,
    mode text,
    "order" bigint
);


ALTER TABLE public.controllers OWNER TO postgres;

--
-- Name: controlers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.controllers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.controlers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: createrequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.createrequest (
    id bigint NOT NULL,
    email text,
    firstname text,
    lastname text,
    class text,
    password text,
    key text,
    expires text
);


ALTER TABLE public.createrequest OWNER TO postgres;

--
-- Name: createrequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.createrequest ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.createrequest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    id bigint NOT NULL,
    action text,
    status text,
    comment text,
    userid bigint,
    date text
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.logs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id bigint NOT NULL,
    userid bigint,
    token text
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sessions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    firstname text,
    password text,
    role text,
    lastname text,
    email text,
    class text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, userid, type) FROM stdin;
2319324175	1	UHF
12177117	1	RFID
1	2	UHF
2	2	RFID
3	3	RFID
\.


--
-- Data for Name: controllers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.controllers (id, type, name, openlink, mode, "order") FROM stdin;
1	barrier	Wyjazd jasna	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=45&open_interval=15&enable_no_tzs=false&stamp=1733493540452&_=1733493540456	out	1005
2	gate	Bramka 4	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=30&open_interval=15&enable_no_tzs=false&stamp=1733515114695&_=1733515114699	out	1004
3	gate	Bramka 4	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=29&open_interval=15&enable_no_tzs=false&stamp=1733517069195&_=1733517069199	in	4
4	gate	Bramka 1	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=28&open_interval=15&enable_no_tzs=false&stamp=1733523444764&_=1733523444770	out	1001
5	gate	Bramka 1	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=27&open_interval=15&enable_no_tzs=false&stamp=1733568512288&_=1733568512292	in	1
6	gate	Bramka 2	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=48&open_interval=15&enable_no_tzs=false&stamp=1733568646707&_=1733568646712	out	1002
7	gate	Bramka 2	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=49&open_interval=15&enable_no_tzs=false&stamp=1733568715935&_=1733568715941	in	2
8	gate	Bramka 3	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=32&open_interval=3&enable_no_tzs=false&stamp=1734176240075&_=1734176240080	out	1003
9	gate	Bramka 3	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=33&open_interval=3&enable_no_tzs=false&stamp=1734176333270&_=1734176333274	in	3
10	barrier	Wjazda jasna	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=6&open_interval=15&enable_no_tzs=false&stamp=1734176480723&_=1734176480734	in	6
11	barrier	Wjazd budowlana	http://bramki.zs1mm.local/iaccess/SendDoorData/?func=opendoor&type=part&data=9&open_interval=15&enable_no_tzs=false&stamp=1734176556181&_=1734176556185	in	5
\.


--
-- Data for Name: createrequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.createrequest (id, email, firstname, lastname, class, password, key, expires) FROM stdin;
1	kacper.bajer@live.zs1mm.edu.pl	Kacper	Bajer	\N	123123	504014	\N
\.


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (id, action, status, comment, userid, date) FROM stdin;
1	Open door Bramka 1 (4)	failed	Something wants wrong	1	\N
2	Open door Bramka 1 (4)	failed	Something wants wrong	1	2024-12-06T22:59:16.453Z
3	Log In	success		1	2024-12-09T21:10:33.855Z
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, userid, token) FROM stdin;
1	1	9d81f033-5db2-4acc-8514-533525093f46
2	2	86bf1568-6336-49d2-a162-6270c54d6ab8
3	3	3f63a56d-b1d7-427a-8bd7-e82e29d8c05d
4	4	b30eee22-a5bd-4200-93c5-d5aa474fea6a
5	1	84d86e6c-8024-4bd2-a7be-9987a5680f93
6	1	b7d49655-f274-46dd-98e8-f30e5288912b
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firstname, password, role, lastname, email, class) FROM stdin;
2	Uczen	123123	user	Szkoly	uczenszkoly@gmail.com	3INB
3	uczen	123123	user	szkoly	uczenszkoly2@gmail.com	3INB
4	uczen	123123	user	szkoly	uczenszkoly3@gmail.com	3INB
1	Kacper	123123	Admin	Bajer	kacperbajer82@gmail.com	3INB
\.


--
-- Name: controlers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.controlers_id_seq', 11, true);


--
-- Name: createrequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.createrequest_id_seq', 1, true);


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: controllers controlers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.controllers
    ADD CONSTRAINT controlers_pkey PRIMARY KEY (id);


--
-- Name: createrequest createrequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.createrequest
    ADD CONSTRAINT createrequest_pkey PRIMARY KEY (id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

