type CreateKommerSessionResponse = {
    status: 'success' | 'failed'
    data?: string
    error?: string
}


export const createKommerSession = async () => {
    try {
        const username = process.env.KOMMER_LOGIN
        const password = process.env.KOMMER_PASS

        const loginResponse = await fetch("http://bramki.zs1mm.local/accounts/login/", {
            method: "POST",
            headers: {
                "Accept": "text/html, */*",
                "Accept-Encoding": "gzip, deflate",
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection": "keep-alive"
            },
            body: new URLSearchParams({
                "username": username as string,
                "password": password as string
            })
        });

        if (!loginResponse.ok) {
           
        const ans: CreateKommerSessionResponse = {
            status: 'failed',
            error: 'Something went wrong'
        };
        return ans
        }

        const setCookieHeader = loginResponse.headers.get("Set-Cookie");
        if (!setCookieHeader) {
            const ans: CreateKommerSessionResponse = {
                status: 'failed',
                error: 'Something went wrong with cookies'
            };
            return ans
        }

        const sessionMatch = /sessionidadms=([^;]+)/.exec(setCookieHeader);
        if (!sessionMatch) {
            const ans: CreateKommerSessionResponse = {
                status: 'failed',
                error: 'Something went wrong with login cookies'
            };
            return ans
        }

        const sessionId = sessionMatch[1];

        return {
            status: 'success',
            data: sessionId
        } as CreateKommerSessionResponse

    } catch (error) {
        return  {
            status: 'failed',
            error: 'Something went wrong with login cookies'
        } as CreateKommerSessionResponse
    }
}