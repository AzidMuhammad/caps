import { Metadata } from "next";
import Db from "@/app/listData/components/list";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: 'Classroom Monitoring System',
  description: 'Monitor classroom occupancy and usage',
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