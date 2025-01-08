import { Metadata } from "next";
import Db from "@/app/components/Dashboard/db";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: 'Kenz Car Wash',
  description: 'The Greatest Car Wash',
};

export default function Dashboard() {
    return (
        <>
        <DefaultLayout>
            <Db/>
        </DefaultLayout>
        </>
    )
}