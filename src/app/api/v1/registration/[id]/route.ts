import { NextRequest, NextResponse } from "next/server";
import { RegistrationApi } from "@/context/registration/infrastructure/registration.api";
import { deleteRegistration, findRegistrationById, updateRegistration } from "@/context/registration/application/create-registration.application";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const registrationRepository = RegistrationApi();
    const response = await findRegistrationById(registrationRepository, id);
    return NextResponse.json(response, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const registrationRepository = RegistrationApi();
    const response = await updateRegistration(registrationRepository, id, body);
    return NextResponse.json(response, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const registrationRepository = RegistrationApi();
    const response = await deleteRegistration(registrationRepository, id);
    return NextResponse.json(response, { status: 200 });
}