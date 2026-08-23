import { NextRequest, NextResponse } from "next/server";
import { registerClubAction, registerFederationAction } from "@/app/get-started/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type || (body.fedCode ? "FEDERATION" : "CLUB");

    if (type === "FEDERATION") {
      const result = await registerFederationAction({
        fedName: body.fedName,
        legalForm: body.legalForm || "ა(ა)იპ",
        fedCode: body.fedCode,
        sportsType: body.sportsType || "სპორტის სახეობა",
        country: body.country || "საქართველო",
        address: body.address || "",
        hqName: body.hqName || "",
        governingDept: body.governingDept || "",
        firstName: body.firstName,
        lastName: body.lastName,
        execPosition: body.execPosition || "პრეზიდენტი / გენერალური მდივანი",
        contactMobile: body.contactMobile,
        officialEmail: body.officialEmail,
        accessCode: body.accessCode,
        personalId: body.personalId,
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Federation registration failed." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Federation registered and tenant initialized.",
          data: result,
        },
        { status: 201 }
      );
    } else {
      // Default: Club Registration
      const result = await registerClubAction({
        clubName: body.clubName,
        clubLegalForm: body.clubLegalForm || "შპს",
        clubCode: body.clubCode,
        clubServices: body.clubServices || "ფიტნეს კლუბი",
        clubAddress: body.clubAddress || "",
        branchesCount: body.branchesCount || "1",
        gatesCount: body.gatesCount || "1",
        clubFirstName: body.clubFirstName || body.firstName,
        clubLastName: body.clubLastName || body.lastName,
        clubExecPosition: body.clubExecPosition || body.position || "დირექტორი",
        clubContactMobile: body.clubContactMobile || body.phone,
        clubOfficialEmail: body.clubOfficialEmail || body.email,
        clubAccessCode: body.clubAccessCode || body.password,
        personalId: body.personalId,
        plan: body.plan,
        billingCycle: body.billingCycle,
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Club registration failed." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Club registered and tenant initialized.",
          data: result,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("API /api/v1/register error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
