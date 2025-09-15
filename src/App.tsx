import { useState } from "react"
import { AnimatedParticles } from "./components/home/particles"

import { Label } from "./components/ui/label"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Building2, Eye, EyeOff,Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

export default function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)


  // const handleLogin = async (userType: "empresa" | "motoboy") => {
  //   setLoading(true)
  //   setError("")

  //   // Simulação de autenticação
  //   if (email && password) {
  //     // Salvar tipo de usuário no localStorage para simular sessão
  //     localStorage.setItem("userType", userType)
  //     localStorage.setItem("userEmail", email)

  //     if (userType === "empresa") {
  //       router.push("/dashboard/empresa")
  //     } else {
  //       router.push("/dashboard/motoboy")
  //     }
  //   } else {
  //     setError("Por favor, preencha todos os campos")
  //   }

  //   setLoading(false)
  // }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center relative overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        >
          <AnimatedParticles />
          <div className="relative z-10 text-center text-white p-8">
            <div className="flex items-center justify-center mb-8">
              <Truck className="h-20 w-20 text-white mr-4" />
              <div>
                <h1 className="text-5xl font-bold">Hop! Entregas</h1>
                <p className="text-xl opacity-90 mt-2">Conectando empresas e motoboys</p>
              </div>
            </div>
            <div className="space-y-6 max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Para Empresas</h3>
                <p className="text-sm opacity-90">Gerencie suas entregas, agende serviços e acompanhe em tempo real</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Para Motoboys</h3>
                <p className="text-sm opacity-90">
                  Encontre entregas próximas, gerencie sua agenda e maximize seus ganhos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center mb-4">
              <Truck className="h-12 w-12 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Hop! Entregas</h1>
            </div>
            <p className="text-gray-600">Conectando empresas e motoboys</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Fazer Login</CardTitle>
              <CardDescription>Entre com suas credenciais para acessar a plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )} */}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="empresa" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 gap-2">
                  <TabsTrigger value="empresa" className="data-[state=active]:bg-green-700 data-[state=active]:shadow-md data-[state=active]:text-white transition-all duration-500 ease-in-out flex items-center gap-2 h-10">
                    <Building2 className="h-4 w-4" />
                    Empresa
                  </TabsTrigger>
                  <TabsTrigger value="motoboy" className="data-[state=active]:bg-green-700 data-[state=active]:shadow-md data-[state=active]:text-white transition-all duration-500 ease-in-out flex items-center gap-2 h-10">
                    <Truck className="h-4 w-4" />
                    Motoboy
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="empresa" className="space-y-4 mt-6">
                  <Button className="w-full h-12 text-lg" onClick={() => {}} disabled={false}>
                    {/* {loading ? "Entrando..." : "Entrar como Empresa"} */}
                  </Button>
                </TabsContent>

                <TabsContent value="motoboy" className="space-y-4 mt-6">
                  <Button className="w-full h-12 text-lg" onClick={() => {}} disabled={false}>
                    {/* {loading ? "Entrando..." : "Entrar como Motoboy"} */}
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="text-center space-y-3 pt-4">
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline block">
                  Esqueci minha senha
                </a>
                <div className="text-sm text-gray-600">
                  Não tem conta?{" "}
                  <a href="/cadastro" className="text-blue-600 hover:underline font-medium">
                    Cadastre-se aqui
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

