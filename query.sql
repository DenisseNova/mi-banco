DROP TABLE public.cuentas;
DROP TABLE public.transacciones;

CREATE TABLE public.cuentas (
	id int4 NULL,
	saldo decimal NULL (saldo >= ​0​)
);

CREATE TABLE public.transacciones (
	descripcion varchar(50) NULL,
	fecha varchar(10) NULL,
	monto decimal NULL,
	cuenta int4 NULL
);

INSERT​ ​INTO​ public.cuentas ​values​ (​1​, ​20000​);