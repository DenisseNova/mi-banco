DROP TABLE public.cuentas;
DROP TABLE public.transacciones;

CREATE​ ​TABLE​ public.cuentas (​id​ ​INT​, saldo ​DECIMAL​ ​CHECK​ (saldo >= ​0​));
INSERT​ ​INTO​ public.cuentas ​values​ (​1​, ​20000​);

CREATE TABLE public.transacciones (
	descripcion varchar(50) NULL,
	fecha varchar(10) NULL,
	monto decimal NULL,
	cuenta int4 NULL
);
