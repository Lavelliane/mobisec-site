import { createRegistration, findAllRegistrations } from "@/context/registration/application/create-registration.application";
import { Registration } from "@/context/registration/domain/registration.schema";
import { RegistrationApi } from "@/context/registration/infrastructure/registration.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const registration = body as Registration;
    const registrationRepository = RegistrationApi();
    const response = await createRegistration(registrationRepository, registration);
    return NextResponse.json(response, { status: 201 });
}

export async function GET(request: NextRequest) {
    const registrationRepository = RegistrationApi();
    const response = await findAllRegistrations(registrationRepository);
    return NextResponse.json(response, { status: 200 });
}